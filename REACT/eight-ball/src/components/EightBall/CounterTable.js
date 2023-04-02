const CounterTable = ({ green, goldenrod, red }) => {

    return (
        <div className="counter-table">
            <table>
                <thead>
                    <tr>
                        <th>Green</th>
                        <th>Goldenrod</th>
                        <th>Red</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{green ? `${green} times` : '-'}</td>
                        <td>{goldenrod ? `${goldenrod} times` : '-'}</td>
                        <td>{red ? `${red} times` : '-'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CounterTable;