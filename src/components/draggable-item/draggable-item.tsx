import React, {useRef} from 'react'
import styles from '../draggable-item/draggable-item.module.css';
import {useDrag, useDrop} from "react-dnd";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from "../../utils/types";
import type { XYCoord } from 'dnd-core'
type TDraggableItem = {
    ingredient: TIngredient,
    index: number,
    moveItem: (arg0: number, arg1: number) => void,
    removeIngredient: (arg: string) => void,
}

const DraggableItem = ({ ingredient, index, moveItem, removeIngredient }: TDraggableItem) => {
    const ref = useRef<HTMLDivElement>(null)
    const handleClick = () => removeIngredient(ingredient.key);

    const [, dropRef] = useDrop<{ index: number}, void>({
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
            const hoverActualY = (monitor.getClientOffset() as XYCoord).y - hoverBoundingRect.top
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
    );
}
export default DraggableItem