export const calculateArchetype = (traits) => {
    const { openness, extraversion, agreeableness, conscientiousness } = traits;

    if (extraversion > 0.6 && openness > 0.6) return "The Adventurer";
    if (conscientiousness > 0.7 && agreeableness > 0.6) return "The Guardian";
    if (openness > 0.7 && conscientiousness < 0.4) return "The Free Spirit";
    if (agreeableness > 0.7 && extraversion > 0.6) return "The Charmer";
    if (conscientiousness > 0.6 && extraversion < 0.4) return "The Mastermind";
    if (agreeableness > 0.7 && conscientiousness > 0.6) return "The Caregiver";
    if (openness > 0.6 && extraversion < 0.4) return "The Idealist";

    return "The Pragmatist";
};

export const calculateCompatibility = (userA, userB) => {
    const orientationMatch = checkOrientation(userA, userB);
    if (!orientationMatch) return 0; 

    const traitsA = [userA.openness || 0.5, userA.extraversion || 0.5, userA.agreeableness || 0.5, userA.conscientiousness || 0.5, userA.career_ambition || 0.5];
    const traitsB = [userB.openness || 0.5, userB.extraversion || 0.5, userB.agreeableness || 0.5, userB.conscientiousness || 0.5, userB.career_ambition || 0.5];

    let totalDiff = 0;
    for (let i = 0; i < traitsA.length; i++) {
        totalDiff += Math.abs(traitsA[i] - traitsB[i]);
    }

    const maxDiff = 5.0;
    
    let score = ((maxDiff - totalDiff) / maxDiff) * 100;

    if (userA.chronotype === userB.chronotype) score += 5;
    if (userA.love_language === userB.love_language) score += 5;

    if (score > 99.9) score = 99.9;
    
    return parseFloat(score.toFixed(1));
};

const checkOrientation = (uA, uB) => {
    const aSeeks = uA.sexual_orientation;
    const bSeeks = uB.sexual_orientation;

    if (aSeeks === 'Straight' && uA.gender === uB.gender) return false;
    if (bSeeks === 'Straight' && uB.gender === uA.gender) return false;

    if (aSeeks === 'Gay' && uA.gender !== uB.gender) return false;
    if (bSeeks === 'Gay' && uB.gender !== uA.gender) return false;

    return true; 
};
