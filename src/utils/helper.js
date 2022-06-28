//jshint esversion: 9

export const normalizePosition = (position, elementLengthX, elementLengthY) => {
    return {
        x: position.x / elementLengthX,
        y: position.y / elementLengthY,
    };
};

export const getRelativeCoordinate = (elementOffset, targetOffsetX, targetOffsetY) => {
    return {
        x: elementOffset.x - targetOffsetX,
        y: elementOffset.y - targetOffsetY,
    };
};

// export const
