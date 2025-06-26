import Guest from './Guest';

function Index({ guests }) {
    return (
        <div className="guest-index">
            { guests.map((guest) => {
                return (
                    <Guest guest={guest}/>
                )
            })}
        </div>
    )
}

export default Index;