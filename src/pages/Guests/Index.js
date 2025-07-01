import Guest from './Guest';

function Index({ wedding }) {
    return (
        <div className="guest-index">
            { wedding.guest_emails.map((guest) => {
                return (
                    <Guest guest={guest}/>
                )
            })}
        </div>
    )
}

export default Index;