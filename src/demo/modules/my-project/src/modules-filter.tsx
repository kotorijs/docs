import { type Context, FilterTestList } from 'kotori-bot'

export function main(ctx: Context) {
  // #region f1
  // 基础过滤条件
  ctx.filter({
    test: FilterTestList.PLATFORM,
    operator: '==',
    value: 'discord'
  })

  // 等价的组过滤条件
  ctx.filter({
    type: 'all_of',
    filters: [
      {
        test: FilterTestList.PLATFORM,
        operator: '==',
        value: 'discord'
      }
    ]
  })
  // #endregion f1

  // #region f2
  // 全部匹配
  ctx.filter({
    type: 'all_of',
    filters: [
      {
        test: FilterTestList.PLATFORM,
        operator: '==',
        value: 'discord'
      },
      {
        test: FilterTestList.USER_ID,
        operator: '!=',
        value: '123456'
      }
    ]
  })

  // 任一匹配
  ctx.filter({
    type: 'any_of',
    filters: [
      {
        test: FilterTestList.GROUP_ID,
        operator: '==',
        value: '789012'
      },
      {
        test: FilterTestList.ACCESS,
        operator: '>=',
        value: 3
      }
    ]
  })

  // 全部不匹配
  ctx.filter({
    type: 'none_of',
    filters: [
      {
        test: FilterTestList.SELF_ID,
        operator: '==',
        value: 'bot123'
      },
      {
        test: FilterTestList.LOCALE_TYPE,
        operator: '==',
        value: 'zh_CN'
      }
    ]
  })
  // #endregion f2

  // #region f3
  // 正确的使用方式
  ctx.filter({
    test: FilterTestList.ACCESS,
    operator: '>=',
    value: 2
  })

  // 链式调用方式
  ctx
    .filter({
      test: FilterTestList.PLATFORM,
      operator: '==',
      value: 'discord'
    })
    .filter({
      test: FilterTestList.ACCESS,
      operator: '>=',
      value: 2
    })

  // 组织条件的正确方式
  ctx.filter({
    type: 'all_of',
    filters: [
      {
        test: FilterTestList.PLATFORM,
        operator: '==',
        value: 'discord'
      },
      {
        type: 'any_of',
        filters: [
          {
            test: FilterTestList.ACCESS,
            operator: '>=',
            value: 3
          },
          {
            test: FilterTestList.IDENTITY,
            operator: '==',
            value: 'admin'
          }
        ]
      }
    ]
  })
  // #endregion f3
}
