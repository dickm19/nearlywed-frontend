

function Guest({ first_name, last_name, email, rsvp}) {
    return (
        <div className='guest-slot'>
            { first_name } { last_name }
            { email }
            { rsvp }
        </div>
    )
}

export default Guest