import { useCallback, useEffect, useState } from 'react';
import axiosAPI from '../api/axiosAPI';
import type IMeal from '../../types/meals/meal';
import type IError from '../../types/error/error';
import { isAxiosError } from 'axios';

const useGetMealsData = (path?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError>({
    status: null,
    message: '',
  });
  const [mealsData, setMealsData] = useState<IMeal[]>([]);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosAPI(path ? path : 'meals.json');
      const mealsData = response.data;

      if (mealsData) {
        const mealsDataKey: string[] = Object.keys(mealsData);

        const restructuredMealsData: IMeal[] = mealsDataKey.map((mealData) => {
          return {
            ...mealsData[mealData],
            id: mealData,
          };
        });

        setMealsData(restructuredMealsData);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          const status: number = error.response.status;

          return setError({
            status: status,
            message: 'Server error :(',
          });
        }

        return setError({
          status: null,
          message: 'unknown error',
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getData();
  }, [getData]);

  return {
    loading,
    error,
    mealsData,
    updateData: getData,
  };
};

export default useGetMealsData;
