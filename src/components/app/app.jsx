import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
const App = () => {
    return (
        <div className='App'>
            <AppHeader/>
            <main className={`pt-5 pb-5`}>
                <div className={`container`}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </div>
            </main>
        </div>
    )
}
export default App;