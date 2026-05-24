function detectVIPCustomer(

    messages = []
) {

    const count =
    messages.length;

    if (count > 80) {

        return true;
    }

    return false;
}

module.exports = {

    detectVIPCustomer
};