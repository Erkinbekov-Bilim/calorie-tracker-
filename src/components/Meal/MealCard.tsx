import React from 'react';
import './MealCard.css';
import type IMeal from '../../../types/meals/meal';
import Button from '../../UI/Button/Button';
import { Link } from 'react-router-dom';

interface IMealCard {
  mealData: IMeal;
  onDeleteMeal: (id: string) => void;
}

const MealCard: React.FC<IMealCard> = ({ mealData, onDeleteMeal }) => {
  return (
    <div className="meal-card">
      <div className="meal-card-info">
        <p className="meal-time">{mealData.meal_time}</p>
        <p className="meal-description">{mealData.meal_description}</p>
      </div>

      <div className="meal-bottom">
        <p className="meal-calorie">{mealData.meal_calorie} kcal</p>

        <div className="meal-actions">
          <Link className="meal-edit" to={`meals/${mealData.id}/edit`} />
          <Button
            className="meal-delete"
            onClick={() => onDeleteMeal(mealData.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default MealCard;
