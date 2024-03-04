//! You will need to use bracket notation to access the properties containing 
//! special characters, such as the hyphen in "alternative-names"


export type Person = {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
      rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
      protected: boolean;
    };
    featured_media: number;
    template: string;
    acf: {
      "alternative-names": string;
      url: string;
      tags: string;
      metatags: string;
      org: string;
      pers: string;
      identifier: string;
      firstname: string;
      lastname: string;
      email: string;
      function: string;
      room: string;
      research: string;
    };
    _links: {
      self: Array<{
        href: string;
      }>;
      collection: Array<{
        href: string;
      }>;
      about: Array<{
        href: string;
      }>;
      "wp:featuredmedia": Array<{
        embeddable: boolean;
        href: string;
      }>;
      "wp:attachment": Array<{
        href: string;
      }>;
      curies: Array<{
        name: string;
        href: string;
        templated: boolean;
      }>;
    };
  };
  