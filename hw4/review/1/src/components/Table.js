import Row from './Row'

export default function Table ({table, onchange_func, onkeydown_func, onclick_func}) {
    return (
        <>
        <table className="fakesheet-table">
            <tbody>
                {table.map((row_vector, row_idx) => (<Row row_idx={row_idx} row_vec={row_vector} onchange_func={onchange_func} onkeydown_func={onkeydown_func} onclick_func={onclick_func} />))}
            </tbody>
        </table>
        </>
    );
};