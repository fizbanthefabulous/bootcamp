function mapScoreMessage(score) {
    if(score >= 200) {
        return 'elite';
    }
    else if(score > 100) {
        return 'great';
    }
    else if(score > 50) {
        return 'good';
    }
    else if(score > 20) {
        return 'decent';
    }
    else {
        return 'needswork';
    }
}

export default mapScoreMessage;