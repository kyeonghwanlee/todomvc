describe('empty spec', () => {

  beforeEach(function () {
    cy.viewport(1920,1080)
    cy.visit('https://sso.liveklass.com/login?query=%7B%22next%22%3A%22%252F%22%7D')
  })


  it('1. login menu test', () => {
    cy.contains('카카오톡으로 로그인').should('exist')
    cy.contains('구글로 로그인').should('exist')
    cy.contains('페이스북으로 로그인').should('exist')
    cy.contains('이메일로 로그인').should('exist')
    cy.contains('로그인').should('exist')

    // Forgot password
    cy.contains('비밀번호 재설정').click() 
    cy.contains('이메일 발송').should('exist')

    // email input false
    cy.contains('이메일 형식으로 입력해 주세요').should('not.exist')

    cy.get('[placeholder="이메일을 입력해주세요"]').type('@dl29240730')
    cy.contains('이메일 발송').click()

    cy.contains('이메일 형식으로 입력해 주세요').should('exist') 

    // check
    cy.contains('비밀번호를 재설정할 수 있는 링크를 메일로 발송하였습니다.').should('not.exist')
    cy.get('[placeholder="이메일을 입력해주세요"]').clear()
    cy.get('[placeholder="이메일을 입력해주세요"]').type('ruoghks@gmail.com')
    cy.contains('이메일 발송').click() 
    cy.contains('비밀번호를 재설정할 수 있는 링크를 메일로 발송하였습니다.').should('exist')

    // Ok button
    cy.contains('확인').click()
  })
  
  it('1-1. Login failse (error email&error password)', () => {
    // email text input false
    cy.contains('가입된 이메일이 아닙니다. 입력한 내용을 다시 확인해주세요.').should('not.exist')

    cy.get('[type="text"]').type('admin')
    cy.get('[type="password"]').type('admin')
    cy.get('[class="lk-button gradient"]').click()

    cy.contains('가입된 이메일이 아닙니다. 입력한 내용을 다시 확인해주세요.').should('exist') 
  })

  it('1-2. Login failse(no password)', () => {
    // email text input false
    cy.contains('비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해 주세요.').should('not.exist')

    cy.get('[type="text"]').type('ruoghks@gmail.com')
    cy.get('[type="password"]').type('admin')
    cy.get('[class="lk-button gradient"]').click()

    cy.contains('비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해 주세요.').should('exist') 
  })

  it('1-3. Login failse(no email & password)', () => {
    // email text input false
    cy.contains('필수 정보입니다.').should('not.exist')
    cy.get('[class="lk-button gradient"]').click()
    cy.contains('필수 정보입니다.').should('exist') 
  })

  it('1-4. Login should mypage login & logout', () => {
    // id & pw text input
    cy.get('[type="text"]').type('ruoghks@gmail.com')
    cy.get('[type="password"]').type('@dl29240730')

    // login button click
    cy.get('[class="lk-button gradient"]').click()

    // site page verification
    cy.url().should('include','/mypage')
    cy.wait(1000)
    cy.url().then((valse) => {
      cy.log('The current real URL id: ', valse)
    })
  })
})