import React from 'react';
import { useParams } from 'react-router-dom';
import { SearchAPIidrevenue } from '../services/apis';

function DetailsRecipes() {
  const { id } = useParams();
  // a função abaixo fiz apenas para fazer a requisição da API para me entregar o ID, sinta-se livre para refatorar se quiser.
  const ReturnAPIMeals = async () => {
    await SearchAPIidrevenue(id);
  };
  ReturnAPIMeals();
  return (
    <div>
      DetailsRecipes
    </div>
  );
}

export default DetailsRecipes;
