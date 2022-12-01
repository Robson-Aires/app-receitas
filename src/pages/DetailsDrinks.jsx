import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { SearchAPIidrink } from '../services/apiDrinks';

function DetailsDrinks() {
  const { id } = useParams();
  const [dataDrinks, setDataDrinks] = useState({ drinks: [{}] });
  const [ingredientsMeasures, setIngredientsMeasures] = useState([]);
  // a função abaixo fiz apenas para fazer a requisição da API para me entregar o ID, sinta-se livre para refatorar se quiser.
  useEffect(() => {
    const ReturnAPIDrinks = async () => {
      setDataDrinks(await SearchAPIidrink(id));
    };
    ReturnAPIDrinks();
  }, [id]);

  useEffect(() => {
    console.log(dataDrinks);
    const { drinks } = dataDrinks;
    const arrIngredients = Object
      .entries(drinks[0]).filter(([chave, val]) => chave.includes('strIngredient') && val)
      .map((el) => el[1]); // [chv, val] => val
    const arrMeasures = Object
      .entries(drinks[0]).filter(([chave, val]) => chave.includes('strMeasure') && val)
      .map((el) => el[1]);
    const combineIngMeas = arrIngredients
      .map((ingr, i) => (`${ingr} ${arrMeasures[i]}`));
    // console.log(combineIngMeas);
    setIngredientsMeasures(combineIngMeas);
  }, [dataDrinks]);

  return (
    <div>
      {
        dataDrinks?.drinks?.length > 0 && (
          <>
            <img
              src={ dataDrinks?.drinks[0]?.strDrinkThumb }
              alt={ dataDrinks?.drinks[0]?.strTags }
              data-testid="recipe-photo"
            />
            <h3 data-testid="recipe-title">{ dataDrinks?.drinks[0]?.strDrink}</h3>
            {/* <p data-testid="recipe-category">{dataDrinks?.drinks[0]?.strCategory}</p> */}
            <p data-testid="recipe-category">{dataDrinks?.drinks[0]?.strAlcoholic}</p>
            <ul>
              {
                ingredientsMeasures
                  ?.map((el, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {el}

                    </li>
                  ))
              }
            </ul>
            <p data-testid="instructions">{dataDrinks?.drinks[0]?.strInstructions}</p>

          </>
        )
      }
    </div>
  );
}

export default DetailsDrinks;
