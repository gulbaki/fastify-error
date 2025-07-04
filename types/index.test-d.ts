import createError, { FastifyError, FastifyErrorConstructor } from '..'
import { expectType, expectError } from 'tsd'

const CustomError = createError('ERROR_CODE', 'message')
expectType<FastifyErrorConstructor<{ code: 'ERROR_CODE' }>>(CustomError)
const err = new CustomError()
expectType<FastifyError & { code: 'ERROR_CODE' }>(err)
expectType<'ERROR_CODE'>(err.code)
expectType<string>(err.message)
expectType<number | undefined>(err.statusCode)

const CustomErrorNoStackTrace = createError('ERROR_CODE', 'message', undefined, undefined, false)
expectType<FastifyErrorConstructor<{ code: 'ERROR_CODE' }>>(CustomErrorNoStackTrace)
const errNoStackTrace = new CustomErrorNoStackTrace()
expectType<FastifyError & { code: 'ERROR_CODE' }>(errNoStackTrace)
expectType<'ERROR_CODE'>(errNoStackTrace.code)
expectType<string>(errNoStackTrace.message)
expectType<number | undefined>(errNoStackTrace.statusCode)

const CustomTypedError = createError('OTHER_CODE', 'message', 400)
expectType<FastifyErrorConstructor<{ code: 'OTHER_CODE', statusCode: 400 }>>(CustomTypedError)
const typed = new CustomTypedError()
expectType<FastifyError & { code: 'OTHER_CODE', statusCode: 400 }>(typed)
expectType<'OTHER_CODE'>(typed.code)
expectType<string>(typed.message)
expectType<400>(typed.statusCode)

/* eslint-disable no-new */
const CustomTypedArgError = createError<[string]>('OTHER_CODE', 'expect %s message', 400)
CustomTypedArgError('a')
expectError(CustomTypedArgError('a', 'b'))
expectError(new CustomTypedArgError('a', 'b'))
expectError(CustomTypedArgError(1))
expectError(new CustomTypedArgError(1))

const CustomTypedArgError2 = createError<string, number, [string]>('OTHER_CODE', 'expect %s message', 400)
CustomTypedArgError2('a')
expectError(CustomTypedArgError2('a', 'b'))
expectError(new CustomTypedArgError2('a', 'b'))
expectError(CustomTypedArgError2(1))
expectError(new CustomTypedArgError2(1))

const CustomTypedArgError3 = createError<string, number, [string, string]>('OTHER_CODE', 'expect %s message but got %s', 400)
expectError(CustomTypedArgError3('a'))
CustomTypedArgError3('a', 'b')
new CustomTypedArgError3('a', 'b')
expectError(CustomTypedArgError3(1))
expectError(new CustomTypedArgError3(1))
expectError(new CustomTypedArgError3(1, 2))
expectError(new CustomTypedArgError3('1', 2))
expectError(new CustomTypedArgError3(1, '2'))

const CustomTypedArgError4 = createError<string, number, [string, string]>('OTHER_CODE', 'expect %s message but got %s', 400)
expectError(CustomTypedArgError4('a'))
CustomTypedArgError4('a', 'b')
new CustomTypedArgError4('a', 'b')
expectError(CustomTypedArgError4(1))
expectError(new CustomTypedArgError4(1))
expectError(new CustomTypedArgError4(1, 2))
expectError(new CustomTypedArgError4('1', 2))
expectError(new CustomTypedArgError4(1, '2'))

const CustomTypedArgError5 = createError<[string, string, string, string]>('OTHER_CODE', 'expect %s message but got %s. Please contact %s by emailing to %s', 400)
expectError(CustomTypedArgError5('a'))
expectError(new CustomTypedArgError5('a', 'b'))
expectError(new CustomTypedArgError5('a', 'b', 'c'))
CustomTypedArgError5('a', 'b', 'c', 'd')
expectError(new CustomTypedArgError5('a', 'b', 'c', 'd', 'e'))

const CustomTypedArgError6 = createError<string, number, [string, string, string, string]>('OTHER_CODE', 'expect %s message but got %s. Please contact %s by emailing to %s', 400)
expectError(CustomTypedArgError6('a'))
expectError(new CustomTypedArgError6('a', 'b'))
expectError(new CustomTypedArgError6('a', 'b', 'c'))
CustomTypedArgError6('a', 'b', 'c', 'd')
expectError(new CustomTypedArgError6('a', 'b', 'c', 'd', 'e'))

const CustomErrorWithErrorConstructor = createError('ERROR_CODE', 'message', 500, TypeError)
expectType<FastifyErrorConstructor<{ code: 'ERROR_CODE', statusCode: 500 }>>(CustomErrorWithErrorConstructor)
CustomErrorWithErrorConstructor({ cause: new Error('Error') })
const customErrorWithErrorConstructor = CustomErrorWithErrorConstructor()
if (customErrorWithErrorConstructor instanceof FastifyError) {
  expectType<'ERROR_CODE'>(customErrorWithErrorConstructor.code)
  expectType<string>(customErrorWithErrorConstructor.message)
  expectType<500>(customErrorWithErrorConstructor.statusCode)
}

const error = new FastifyError('ERROR_CODE', 'message', 500)
if (error instanceof FastifyError) {
  expectType<string>(error.code)
  expectType<string>(error.message)
  expectType<number | undefined>(error.statusCode)
}
