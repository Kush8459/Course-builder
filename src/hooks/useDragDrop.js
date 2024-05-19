import { useDrag, useDrop } from 'react-dnd';

export const useDragDrop = (type, item) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: type,
    drop: (droppedItem) => handleDrop(droppedItem),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleDrop = (droppedItem) => {
    // Handle drop logic
  };

  return { isDragging, drag, isOver, drop };
};
