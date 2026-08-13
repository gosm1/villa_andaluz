import { useState } from 'react'
import Icon from './Icons.jsx'
import { villa } from '../data/villa.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

/** Today at midnight, so "today" itself is still a valid arrival. */
function today() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * `<input type="date">` gives "YYYY-MM-DD", which `new Date(str)` parses as UTC
 * midnight. Comparing that against a local midnight is off by the UTC offset,
 * so a guest in the Americas picking today got "arrival cannot be in the past".
 * Build the date from its parts instead, which is local by definition.
 */
function parseDay(value) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/**
 * Returns a `{ field: message }` map; empty means the form is good.
 * Validated here rather than leaning on the browser so the messages are in the
 * site's own voice and the date rules (past dates, departure before arrival)
 * can actually be expressed.
 */
function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please tell us your name.'
  else if (values.name.trim().length < 2) errors.name = 'That looks too short to be a name.'

  if (!values.email.trim()) errors.email = 'We need an email address to reply to.'
  else if (!EMAIL.test(values.email.trim())) errors.email = 'That email address does not look right.'

  // Optional, but if given it should be plausibly dialable.
  if (values.phone.trim() && values.phone.replace(/[^\d]/g, '').length < 8) {
    errors.phone = 'That phone number looks too short.'
  }

  if (!values.arrival) errors.arrival = 'Which day would you arrive?'
  else if (parseDay(values.arrival) < today()) errors.arrival = 'Arrival cannot be in the past.'

  if (!values.departure) errors.departure = 'And which day would you leave?'
  else if (values.arrival && parseDay(values.departure) <= parseDay(values.arrival)) {
    errors.departure = 'Departure must be after arrival.'
  }

  const guests = Number(values.guests)
  if (!values.guests) errors.guests = 'How many of you are coming?'
  else if (!Number.isInteger(guests) || guests < 1) errors.guests = 'Enter at least one guest.'
  else if (guests > villa.guests) errors.guests = `The villa sleeps ${villa.guests}.`

  return errors
}

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  arrival: '',
  departure: '',
  guests: '6',
  message: '',
}

export default function Enquire() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  // Only show an error once the guest has left the field, or once they have
  // tried to submit — flagging an empty field the moment they tab into it is
  // hostile.
  const show = (field) => (touched[field] ? errors[field] : undefined)

  function update(field, value) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (touched[field] || Object.keys(errors).length) setErrors(validate(next))
  }

  function blur(field) {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])))

    if (Object.keys(found).length) {
      // Move the guest to the first problem rather than leaving them to hunt.
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    // ⚠️ PLACEHOLDER — nothing is sent anywhere yet.
    // The form validates and confirms, but the enquiry is discarded. Before
    // launch, POST `values` to Formspree / Resend / your own endpoint here and
    // only call setSent(true) once that request resolves.
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 600)
  }

  function reset() {
    setValues(EMPTY)
    setErrors({})
    setTouched({})
    setSent(false)
  }

  const nights =
    values.arrival && values.departure && parseDay(values.departure) > parseDay(values.arrival)
      ? // round, not floor: a DST change inside the stay shifts the span by an hour
        Math.round((parseDay(values.departure) - parseDay(values.arrival)) / 86400000)
      : 0

  return (
    <section className="enquire" id="contact" aria-labelledby="enquire-heading">
      <div className="shell enquire__grid">
        <div className="enquire__intro">
          <p className="eyebrow">Enquire</p>
          <h2 id="enquire-heading" className="enquire__title">
            Tell us your dates and we'll do the <em className="serif-italic">rest</em>
          </h2>
          <p className="prose">
            {villa.host.name} answers personally, {villa.host.responseTime}, in{' '}
            {villa.host.languages.join(', ')}.
          </p>

          <ul className="enquire__contacts">
            <li>
              <Icon name="phone" size={18} />
              <a href={`tel:${villa.contact.phone.replace(/\s/g, '')}`}>{villa.contact.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <a href={`mailto:${villa.contact.email}`}>{villa.contact.email}</a>
            </li>
            <li>
              <Icon name="map" size={18} />
              {villa.location}
            </li>
          </ul>
        </div>

        <div className="enquire__panel">
          {sent ? (
            <div className="enquire__done">
              <span className="confirmed__mark">
                <Icon name="check" size={26} />
              </span>
              <h3>Thank you, your message is on its way</h3>
              <p className="prose">
                {villa.host.name} will come back to you {villa.host.responseTime} with availability
                and a price for your dates.
              </p>
              <button type="button" className="linkbtn" onClick={reset}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="formgrid">
                <Field
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  error={show('name')}
                  onChange={update}
                  onBlur={blur}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  error={show('email')}
                  onChange={update}
                  onBlur={blur}
                />
                <Field
                  label="Arrival"
                  name="arrival"
                  type="date"
                  value={values.arrival}
                  error={show('arrival')}
                  onChange={update}
                  onBlur={blur}
                />
                <Field
                  label="Departure"
                  name="departure"
                  type="date"
                  value={values.departure}
                  error={show('departure')}
                  onChange={update}
                  onBlur={blur}
                />
                <Field
                  label="Guests"
                  name="guests"
                  type="number"
                  min="1"
                  max={villa.guests}
                  value={values.guests}
                  error={show('guests')}
                  onChange={update}
                  onBlur={blur}
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  error={show('phone')}
                  onChange={update}
                  onBlur={blur}
                />
                <Field
                  label="Message"
                  name="message"
                  textarea
                  wide
                  placeholder="Anything we should know about your stay?"
                  value={values.message}
                  error={show('message')}
                  onChange={update}
                  onBlur={blur}
                />
              </div>

              {nights > 0 && (
                <p className="enquire__nights">
                  {nights} {nights === 1 ? 'night' : 'nights'} for {values.guests || 1}{' '}
                  {Number(values.guests) === 1 ? 'guest' : 'guests'}
                </p>
              )}

              <button type="submit" className="btn btn--primary btn--block" disabled={sending}>
                {sending ? 'Sending…' : 'Send enquiry'}
              </button>
              <p className="enquire__note">
                No payment is taken here. This is a direct message to the villa.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  textarea = false,
  wide = false,
  error,
  value,
  onChange,
  onBlur,
  ...rest
}) {
  const id = `enquire-${name}`
  const errorId = `${id}-error`
  const Tag = textarea ? 'textarea' : 'input'

  return (
    <label className={`${wide ? 'is-wide' : ''} ${error ? 'has-error' : ''}`.trim()} htmlFor={id}>
      {label}
      <Tag
        id={id}
        name={name}
        {...(textarea ? {} : { type })}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {/* Announced as it appears, so screen-reader users are not left guessing
          why the form refused to submit. */}
      <span className="field__error" id={errorId} role="alert">
        {error}
      </span>
    </label>
  )
}
