
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  role: 'role',
  emailVerified: 'emailVerified',
  image: 'image'
};

exports.Prisma.ClientScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  profession: 'profession',
  age: 'age',
  gender: 'gender',
  localisation: 'localisation'
};

exports.Prisma.LawyerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  age: 'age',
  localisation: 'localisation',
  budget: 'budget',
  gender: 'gender',
  specialité: 'specialité',
  Star: 'Star'
};

exports.Prisma.ConseilJuridiqueScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.RedactionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.ResolutionLitigeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.ServiceParDomaineScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.PreventifsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.ValeurAjouterScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.FriendsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  nbrDeContrat: 'nbrDeContrat',
  key: 'key'
};

exports.Prisma.FriendLawScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  nbrDeContrat: 'nbrDeContrat',
  key: 'key'
};

exports.Prisma.ContratScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  date: 'date',
  content: 'content'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  content: 'content',
  TimeToReceive: 'TimeToReceive',
  vue: 'vue',
  type: 'type',
  key: 'key'
};

exports.Prisma.ClientNotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  content: 'content',
  TimeToReceive: 'TimeToReceive',
  vue: 'vue',
  type: 'type',
  key: 'key'
};

exports.Prisma.ContactScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  contenu: 'contenu',
  date: 'date',
  key: 'key'
};

exports.Prisma.ClientContactScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  contenu: 'contenu',
  date: 'date',
  key: 'key'
};

exports.Prisma.DiplomeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  ecole: 'ecole',
  anne: 'anne',
  nom: 'nom'
};

exports.Prisma.ExperienceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  poste: 'poste',
  durant: 'durant'
};

exports.Prisma.CalendarScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  client: 'client',
  moment: 'moment'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
  refresh_token_expires_in: 'refresh_token_expires_in'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  createdById: 'createdById'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  role: 'role',
  image: 'image'
};

exports.Prisma.ClientOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  profession: 'profession',
  gender: 'gender',
  localisation: 'localisation'
};

exports.Prisma.LawyerOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  localisation: 'localisation',
  budget: 'budget',
  gender: 'gender',
  specialité: 'specialité'
};

exports.Prisma.ConseilJuridiqueOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.RedactionOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.ResolutionLitigeOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.ServiceParDomaineOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.PreventifsOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.ValeurAjouterOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  content: 'content',
  desc: 'desc'
};

exports.Prisma.FriendsOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  nbrDeContrat: 'nbrDeContrat',
  key: 'key'
};

exports.Prisma.FriendLawOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  nbrDeContrat: 'nbrDeContrat',
  key: 'key'
};

exports.Prisma.ContratOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  content: 'content'
};

exports.Prisma.NotificationOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  content: 'content',
  type: 'type',
  key: 'key'
};

exports.Prisma.ClientNotificationOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  content: 'content',
  type: 'type',
  key: 'key'
};

exports.Prisma.ContactOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  contenu: 'contenu',
  key: 'key'
};

exports.Prisma.ClientContactOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  contenu: 'contenu',
  key: 'key'
};

exports.Prisma.DiplomeOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  ecole: 'ecole',
  anne: 'anne',
  nom: 'nom'
};

exports.Prisma.ExperienceOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  poste: 'poste',
  durant: 'durant'
};

exports.Prisma.CalendarOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  client: 'client'
};

exports.Prisma.AccountOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.SessionOrderByRelevanceFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId'
};

exports.Prisma.PostOrderByRelevanceFieldEnum = {
  name: 'name',
  createdById: 'createdById'
};

exports.Prisma.VerificationTokenOrderByRelevanceFieldEnum = {
  identifier: 'identifier',
  token: 'token'
};


exports.Prisma.ModelName = {
  User: 'User',
  Client: 'Client',
  Lawyer: 'Lawyer',
  ConseilJuridique: 'ConseilJuridique',
  Redaction: 'Redaction',
  ResolutionLitige: 'ResolutionLitige',
  ServiceParDomaine: 'ServiceParDomaine',
  Preventifs: 'Preventifs',
  ValeurAjouter: 'ValeurAjouter',
  Friends: 'Friends',
  FriendLaw: 'FriendLaw',
  Contrat: 'Contrat',
  Notification: 'Notification',
  ClientNotification: 'ClientNotification',
  Contact: 'Contact',
  ClientContact: 'ClientContact',
  Diplome: 'Diplome',
  Experience: 'Experience',
  Calendar: 'Calendar',
  Account: 'Account',
  Session: 'Session',
  Post: 'Post',
  VerificationToken: 'VerificationToken'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
