test('test match #1', ()=>{
    expect('maksyuki').toBe('maksyuki')
})

test('test match #2', ()=>{
    const a = {number: 234}
    // expect(a).toBe({number: 234})
    expect(a).toStrictEqual({number: 234})
})

test('test match #3', ()=>{
    const a = null
    expect(a).toBeNull()
})

test('test match #4', ()=>{
    const a = undefined
    expect(a).toBeUndefined()
})

test('test match #5', ()=>{
    const a = 233
    expect(a).toBeDefined()
})

test('test match #6', ()=>{
    const a = 233
    expect(a).toBeTruthy()
})

test('test match #7', ()=>{
    const a = 0
    expect(a).toBeFalsy()
})

test('test match #8', ()=>{
    const a = 0
    expect(a).toBeGreaterThan(-1)
})