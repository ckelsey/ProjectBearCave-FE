<template>
    <div>
        <h1>Privacy Policy for {{constants.companyName}}</h1>

        <p>
            This Privacy Policy explains what {{constants.companyName}}. ({{constants.companyAbbr}}) does with the personal information that is collected from our users. {{constants.companyAbbr}} may change its policy from time to time, so it is suggested that you check this web site from time to time to ensure that you know about our current policy. If you have any questions or concerns regarding this policy, you should contact us at
            <a
                :href="constants.contactMailTo"
                target="_blank"
            >{{constants.contactEmail}}</a>.
        </p>

        <p>{{constants.companyAbbr}} may collect IP addresses to help understand how our audience uses our site and to gather broader demographic information, so that {{constants.companyAbbr}} can make its site better and improve users’ overall experience when they visit Classactionapp.com. For these same reasons, if your browser is set up to accept them, {{constants.companyAbbr}} uses a feature known as a “cookie.” Cookies contain bits of information that websites transfer to your computer’s hard drive for record keeping purposes. Cookies can make the Web more useful by storing information about your preferences on a particular site such as Classactionapp.com. A cookie doesn’t tell {{constants.companyAbbr}} who you are. Only you can do that.</p>

        <br>

        <h4>Children</h4>
        <p>If you are under 18, you may not use this site.</p>
        <br>

        <h4>How {{constants.companyAbbr}} Discloses Your Personal Information</h4>
        <p>{{constants.companyAbbr}} will only disclose any personally identifiable information about individual users, in accordance with this Privacy Policy and the Terms of Service, or to comply with applicable laws or valid legal process, or to protect the rights or property of {{constants.companyAbbr}}.</p>
        <p>{{constants.companyAbbr}} discloses personally identifiable individual information and the other information you provide us to lawyers or law firms in accordance with the Services we provide. {{constants.companyAbbr}} cannot guarantee that the information you submit to us will not end up in the hands of a company or person that you are complaining about.</p>
        <p>{{constants.companyAbbr}} may also disclose your contact information and the other information that you provide us in the following circumstances:</p>
        <p>{{constants.companyAbbr}} may employ other companies and individuals to perform functions on our behalf. They may have access to personal information needed to perform their functions, but will not be able to legally use it for other purposes. {{constants.companyAbbr}} might change, sell, reorganize or liquidate via bankruptcy this business. If so, your information will be one of the transferred assets. {{constants.companyAbbr}} may release account and other personal information when {{constants.companyAbbr}} believes release is appropriate to comply with law, or to protect the rights, property, or safety of {{constants.companyAbbr}}, our users, or others.</p>
        <p>From time to time {{constants.companyAbbr}} may also provide aggregate (statistical) information to third parties to describe our services to prospective partners, advertisers, and other third parties, and for other lawful purposes. If {{constants.companyAbbr}} partners with another party to provide a specific service to you, and if you sign up for the service, then and only then will {{constants.companyAbbr}} provide your other information to such partner.</p>
        <p>
            {{constants.companyAbbr}} may use the information you have provided for our mailing lists and promotional marketing. You may opt out of these emails and marketing materials at any time. To do so, Email
            <a
                :href="constants.contactMailTo"
                target="_blank"
            >{{constants.contactEmail}}</a> and we will promptly remove you from ALL correspondence.
        </p>
        <p>{{constants.companyAbbr}} stores user data on a reputable data hosting platform, "platform". Platform's data is encrypted both when it is sent to and from our servers, as well as when it is at rest. To protect your content in transit, Platform uses 256-bit SSL/TLS encryption. At rest, Platform content is protected using 256-bit AES encryption. Platform's production data is regularly backed up to a separate, isolated location and all backups are encrypted.</p>
        <p>This Privacy Policy pertains to all actions and duties performed on this site and the user hereby agrees to this Privacy Policy by using this site.</p>
        <br>
        <br>
    </div>
</template>
<script lang="ts" src="./privacy-policy.ts"></script>
