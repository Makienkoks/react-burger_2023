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

export type TToken = {
        token: string;
}

export type TUser = TFormFields & { name: string }

export type TForgotFormFields = Omit<TFormFields, 'password'>;

export type TResetFormFields = Omit<TFormFields, 'email'> & TToken;

export type TOrder = {
        ingredients: Array<string>
}
export type TOrderListData = {
        bun?: TIngredient | null,
        ingredients: Array<TIngredient>
}

export type TOrderData = {
        name: string,
        isLoading: boolean,
        success: boolean,
        number: string
}

export enum WebsocketStatus {
        CONNECTING = 'CONNECTING...',
        ONLINE = 'ONLINE',
        OFFLINE = 'OFFLINE'
}
export type TStatus = 'done' | 'pending' | 'created';

export type TOrdersStoreData = {
        success: boolean,
        orders: Array<TFeedOrders>,
        total: number,
        totalToday: number,
}
export type TFeedOrders = {
        _id: string;
        status: TStatus
        number: number;
        createdAt: string;
        updatedAt: string;
        name: string;
        ingredients: Array<string>;
}

