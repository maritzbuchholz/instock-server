export const warehouseValidation = (formResponse) => {
    validatedResponse = fieldValdition(formResponse);
}

export const validateDataStructure = (formResponse) => {
    let structureError = false;
    const fieldWhitelist = [ // A whitelist that allows for data validation and prevents SQL injenction
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
    ];

    for (let field of fieldWhitelist) { // Checks if any field is in the whitelist
        if (formResponse[field] === undefined) {
            structureError = true;
        }
    };
    return structureError;
}

export const validatePhone = (formResponse) => {
    let phoneError = false;
    const phoneResponse = formResponse["contact_phone"];
    const phonePattern = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
    if (!phonePattern.test(phoneResponse)) {
        phoneError = true;
    }
}

export const validateEmail = (formResponse) => {
    let emailError = false;
    const emailResponse = formResponse["contact_email"];
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailResponse)) {
        emailError = true;
    }
    return emailError;
}