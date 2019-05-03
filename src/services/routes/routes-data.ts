import constants from '../constants'

export const routesData: any = {
    profile: {
        title: `Profile`,
        isUser: true
    },
    claims: {
        title: `Claims`,
        isUser: true
    },
    wallet: {
        title: `Wallet`,
        isUser: true
    },
    discovery: {
        title: `Settlement discovery`,
        isUser: true
    },
    login: {
        title: `Sign in`,
        isUser: false
    },
    register: {
        title: `Sign up`,
        isUser: false
    },
    about: {
        title: `About ${constants.companyName}`,
    },
    support: {
        title: `Need help?`
    },
    terms: {
        title: `Terms and conditions`,
    },
    privacy: {
        title: `Privacy`,
    },
    agreement: {
        title: `User agreement`,
    },
}
