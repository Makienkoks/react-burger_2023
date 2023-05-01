export type TIngredientType = 'bun' | 'sauce' | 'main';
export type TIngredients = {
        _id: string;
        name: string;
        type: TIngredientType;
        proteins: number;
        fat: number;
        carbohydrates: number;
        calories: number;
        price: number;
        image: string;
        image_mobile: string;
        image_large: string;
        __v: number;
}
export type TIngredient =  TIngredients & { key: string };

export type TFormFields = {
        email: string;
        password: string
}

export type TUser = TFormFields & { name: string }

export type TForgotFormFields = Omit<TFormFields, 'password'>;

export type TResetFormFields = Omit<TFormFields, 'email'> & { token: string };