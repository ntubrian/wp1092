import Grid from '../components/Grid'
export default function Row ({row_vector, row_idx}) {
    console.log(row_idx)
    console.log(row_vector)
    return (
        <tr>
          {row_vector.map((value, i)=> (<Grid row_idx={row_idx} column_idx={i} value={value}/>))}
        </tr>
    );
};