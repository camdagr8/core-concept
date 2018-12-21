module.exports = config => {
    const configOverride = { ...config };
    configOverride['dest']['colors'] = 'src/assets/style/_mendies/_colors.scss';

    return configOverride;
};
