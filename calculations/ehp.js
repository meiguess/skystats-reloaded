"use strict";
module.exports = (userData) => {
    return (userData['stats'].health * (1 + (userData['stats'].defense / 100)));
};
