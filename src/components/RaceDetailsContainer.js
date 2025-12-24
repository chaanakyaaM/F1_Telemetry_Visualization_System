export default function RaceDetailsContainer({raceName, year, session}){
    return (
        <div className = "absolute left-0 top-0 m-4 mt-12">
            Race : {raceName}
            <br />
            Year : {year}
            <br />
            session : {session}


        </div>
    );
}