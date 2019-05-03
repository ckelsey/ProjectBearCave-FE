const email = `hello@classactionapp.com`
const local = location.host.substring(0, 9) === `localhost`
const dev = location.host.substring(0, 3) === `dev`

export default {
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
    images: `https://d1g1aamoxberjq.cloudfront.net/cai/img`,
    clarenceSvg: `clarence.svg`,
    authUrl: `https://d1g1aamoxberjq.cloudfront.net/cai/img`,
    apiBase: local || dev
        ? `https://apidev.classactioninc.com/v1`
        : `https://api.classactioninc.com/v1`,
    apiUploadAuth: local || dev
        ? `https://lemzvy5tji.execute-api.us-east-1.amazonaws.com/CAI/sign`
        : `https://lemzvy5tji.execute-api.us-east-1.amazonaws.com/CAI/sign`,
    apiUploadStitch: local || dev
        ? `https://lemzvy5tji.execute-api.us-east-1.amazonaws.com/CAI/stitch`
        : `https://lemzvy5tji.execute-api.us-east-1.amazonaws.com/CAI/stitch`
}
