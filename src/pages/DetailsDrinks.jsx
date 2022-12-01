import React from 'react';
import { useParams } from 'react-router-dom';
import { SearchAPIidrink } from '../services/apiDrinks';

function DetailsDrinks() {
  const { id } = useParams();
  // a função abaixo fiz apenas para fazer a requisição da API para me entregar o ID, sinta-se livre para refatorar se quiser.
  const ReturnAPIDrinks = async () => {
    await SearchAPIidrink(id);
  };
  ReturnAPIDrinks();

  return (
    <div>DetailsDrinks</div>
  );
}

export default DetailsDrinks;
