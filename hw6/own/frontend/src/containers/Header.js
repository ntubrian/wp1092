import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {
  const { addRegularMessage } = useScoreCard();

  const handleClear = async () => {
    if (window.confirm("Do you want to delete the whole database?")){
      const {
        data: { message },
      } = await axios.delete('/api/delete-card', {data:{}}) // TODO: axios.xxx call the right api
      
      addRegularMessage(message);
    }
    else{
      alert("Delete Canceled!");
    }
    
    
  };

  return (
    <Wrapper>
      <Typography variant="h2">ScoreCard DB</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Wrapper>
  );
};

export default Header;
