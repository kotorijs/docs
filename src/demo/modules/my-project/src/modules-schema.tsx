// #region s1
import { type Context, Tsu } from 'kotori-bot'

const strSchema = Tsu.String()
strSchema.check(233) // false
strSchema.check('Hello,Tsukiko!') // true
// #endregion s1

// #region s2
declare const raw: unknown
const value = strSchema.parse(raw)
// if passed the value must be a string
// if not passrd: throw TsuError
// #endregion s2

// #region s3
const result = strSchema.parseSafe(raw)
if (result.value) {
  console.log('Passed:', result.data)
} else {
  console.log('Error:', result.error.message)
}
// #endregion s3

// #region s4
strSchema
  .parseAsync(raw)
  .then((data) => console.log('Passed', data))
  .catch((error) => console.log('Fatal', error))
// #endregion s4

// #region s5
const schema = Tsu.Object({
  name: Tsu.String().default('Romi'),
  age: Tsu.String().default('16')
}).default({
  name: 'Romi',
  age: '16'
})

schema.parse({ name: 'Yuki', age: 17 }) // Passed { name: 'Yuki', age: 17 }
schema.parse({ name: 'Kisaki' }) // Passed { name: 'Kisaki', age: 16 }
schema.parse({}) // Passed { name: 'Romi', age: 16 }
schema.parse([]) // Error
// #endregion s5

// #region s6
strSchema.parse(233) // Passed '233'
strSchema.parse(true) // Error
// #endregion s6

// #region s7
const myNumSchema = Tsu.Number().default(2333)

myNumSchema.parse(undefined) // 2333

const myStrSchema = Tsu.String().optional()

myStrSchema.parse(undefined) // Passed
myStrSchema.parse(null) // Passed
myStrSchema.parse('') // Passed
// #endregion s7

// #region s8
const mySchema = Tsu.String().optional().empty()

mySchema.parse(undefined) // Passed
mySchema.parse(null) // Error
// #endregion s8

// #region s9
const config = Tsu.Object({
  port: Tsu.Number().port().describe('Server port'),
  address: Tsu.String().describe('Server display address')
}).title('Plugin configuration')

const jsonSchema = config.schema()
// #endregion s9

export function main(ctx: Context) {
  // #region s10
  const hitokotoSchema = Tsu.Object({
    data: Tsu.Object({
      hitokoto: Tsu.String(),
      from: Tsu.String().optional()
    })
  })

  ctx.command('hitokoto').action(async () => {
    const res = hitokotoSchema.parse(await ctx.http.get('https://api.hotaru.icu/api/hitokoto/v2/'))

    return (
      <format template="今日一言: {0}{1}">
        <text>{res.data.hitokoto}</text>
        <seg>{res.data.from ? `——${res.data.from}` : ''}</seg>
      </format>
    )
  })
  // #endregion s10
}

export { jsonSchema, value }
