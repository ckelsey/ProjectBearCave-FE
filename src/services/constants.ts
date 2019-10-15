const email = `hello@classactionapp.com`
const local = location.host.substring(0, 9) === `localhost`
const dev = location.host.substring(0, 3) === `dev`

export default {
    isDev: !!local || !!dev,
    siteName: `<span>Class</span><b>Action</b>`,
    companyName: `Class Action, Inc.`,
    companyAbbr: `CAI`,
    street: `2777 Alvarado Street, Suite E`,
    city: `San Leandro`,
    state: `California`,
    zip: `94577`,
    contactEmail: email,
    contactMailTo: `mailto:${email}`,
    termsRevisionDate: `August 30th, 2018`,
    icon: undefined,
    images: `https://dgdgtvvo74ip8.cloudfront.net/img`,
    clarenceSvg: `clarence.svg`,
    apiBase: local || dev
        ? `https://apidev.classactioninc.com/v1`
        : `https://api.classactioninc.com/v1`,
    apiUploadAuth: local || dev
        ? `https://iv9c1ujcjk.execute-api.us-east-1.amazonaws.com/CAI-Uploads/sign`
        : `https://iv9c1ujcjk.execute-api.us-east-1.amazonaws.com/CAI-Uploads/sign`,
    apiUploadStitch: local || dev
        ? `https://iv9c1ujcjk.execute-api.us-east-1.amazonaws.com/CAI-Uploads/stitch`
        : `https://iv9c1ujcjk.execute-api.us-east-1.amazonaws.com/CAI-Uploads/stitch`
}
