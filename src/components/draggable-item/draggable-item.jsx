import React, {useRef} from 'react'
import styles from '../draggable-item/draggable-item.module.css';
import {useDrag, useDrop} from "react-dnd";
import { ingredientsPropTypes } from "../../utils/prop-types";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const DraggableItem = (props) => {
    const { ingredient, index, moveItem, removeIngredient } = props
    const ref = useRef()

    const handleClick = () => removeIngredient(ingredient.key);

    const [, dropRef] = useDrop({
        accept: 'changeOrder',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveItem(dragIndex, hoverIndex)

            item.index = hoverIndex
        },
    });

    const [{ isDragging }, dragRef] = useDrag({
        type: 'changeOrder',
        item: () => {
            return { ingredient, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    dragRef(dropRef(ref))
    const opacity = isDragging ? 0 : 1;

    return (
        <>
            <div className={styles.item}
                 style={{ opacity }}
                 ref={ref}
                 key={ingredient.key}>
                <span className={styles.icon}>
                    <DragIcon type="primary" />
                </span>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={handleClick}
                />
            </div>
        </>
    );
}
DraggableItem.propTypes = {
    ingredient: ingredientsPropTypes.isRequired
};
export default DraggableItem