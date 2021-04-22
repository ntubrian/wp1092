export default function Cell ({row_idx, column_idx, value, onchange_func, onkeydown_func, onclick_func}) {
    let cell_id = `cell-${row_idx}-${column_idx}`;
    const alphabets = { 0:'Z', 1:'A', 2:'B', 3:'C', 4:'D', 5:'E', 6:'F', 7:'G', 8:'H', 9:'I', 
                        10:'J', 11:'K', 12:'L', 13:'M', 14:'N', 15:'O', 16:'P', 17:'Q', 
                        18:'R', 19:'S', 20:'T', 21:'U', 22:'V', 23:'W', 24:'X', 25:'Y'};

    if (column_idx === 0) {
        value=`${row_idx}`;
    } else if (row_idx === 0) {
        let c = column_idx;
        // console.log(value);
        value = alphabets[c%26];
        // value = '';
        while (c > 26) {
            value = `${alphabets[c%26]}${value}`;
            c /= 26;
        }
    } 
    if (row_idx * column_idx === 0) {
        return (
            <td>
                <div className='index' id={cell_id}>{value}</div>
            </td>
        );
    } else {
        return (
            <td>
                <input className='cell' id={cell_id} value={value} onChange={(e) => onchange_func(row_idx, column_idx, e.target.value)} onKeyDown={() => onkeydown_func(row_idx, column_idx)} onClick={() => onclick_func(row_idx, column_idx)}></input>
            </td>
        );
    }
}