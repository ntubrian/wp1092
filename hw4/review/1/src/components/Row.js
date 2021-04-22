import Cell from '../components/Cell'
export default function Row ({row_vec, row_idx, onchange_func, onkeydown_func, onclick_func}) {
	// console.log(row_vec, row_idx);
    return (
        <tr>
			{row_vec.map((value, column_idx) => (<Cell row_idx={row_idx} column_idx={column_idx} value={value} onchange_func={onchange_func} onkeydown_func={onkeydown_func} onclick_func={onclick_func} />))}
      	</tr>
    );
};