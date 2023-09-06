// const defaultTheme = {
//     colors : {
//         'primary-one-light': '#CAF3FC',
//         'primary-one-bright': '#00A6CA',
//         'primary-one-dark': '#0091B0',

//         'primary-two-light': '#D6D6D6',
//         'primary-two-bright': '#707070',
//         'primary-two-dark': '#3D3D3D',
//     }
// }

// const theme1 = {
//     ...defaultTheme,
//     colors : {
//         ...defaultTheme.colors,
//         'primary-one-light': '#FCF5CA',
//         'primary-one-bright': '#FCDF32',
//         'primary-one-dark': '#FCD800',

//         'primary-two-light': '#E5FFF2',
//         'primary-two-bright': '#008743',
//         'primary-two-dark': '#00552A',
//     }
// }

// const themes = {
//     defaultTheme: defaultTheme,
//     theme1: theme1,
// }

const themes = {
    default : 'primary',
    primary : 'primary',
    secondary : 'secondary',


}

const componenents = {
    Button : {

        [themes.default] : {
            default : 'vs-primary-one',
            outline: 'vs-primary-outline',
        }, 

        [themes.primary]  : {
            default : 'vs-primary-one',
            outline: 'vs-primary-outline'
        }, 

        [themes.secondary]  : {
            default : 'vs-secondary-one',
            outline: 'vs-secondary-outline'
        }, 

    }
}

const getComponentClass = (componenent, theme = 'default') => {


    if (!componenent){
        throw new Error('component is undefined')
    }else if (! (componenent in componenents)) {
        throw new Error(`component '${componenent}' is not defined in the theme setting`)
    }else {
        return componenents[componenent][theme]
    }

}

const getButtonComponentClass = (theme = 'default', outline = false, small = false) => {
    return ` ${getComponentClass( 'Button' , theme)[ outline ? 'outline' : 'default']}${small ? '-small' : ''}`
}

module.exports = {
    getButtonComponentClass
}