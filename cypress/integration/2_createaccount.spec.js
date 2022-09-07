describe('empty spec', () => {

  beforeEach(function () {
    cy.viewport(1920,1080)
    cy.visit('https://sso.liveklass.com/createaccount')

    cy.contains('카카오톡으로 가입하기').should('exist')
    cy.contains('구글로 가입하기').should('exist')
    cy.contains('페이스북으로 가입하기').should('exist')
    cy.contains('이메일로 가입하기').should('exist')
    cy.contains('회원가입').should('exist')

    cy.contains('이메일로 가입하기').click()
  })


  it('2-1. createaccount failse (error email)', () => {
    // email text input false
    cy.contains('이메일 형식으로 입력해주세요.').should('not.exist')

    cy.get('[id="id"]').type('admin')
    cy.get('[class="lk-button gradient"]').click()

    cy.contains('이메일 형식으로 입력해주세요.').should('exist') 
  })

  it('2-2. createaccount failse(no password)', () => {
    // email text input false
    cy.contains('영문, 숫자, 특수문자 조합 8자 이상으로 사용해주세요. 사용가능한 특수문자는 ~ ! @ # $ % ^ & * 입니다.').should('not.exist')
    cy.contains('약관에 동의하셔야 합니다.').should('not.exist')

    cy.get('[id="id"]').type('ruoghks@gmail.com')
    cy.get('[placeholder="영문, 숫자, 특수문자 조합 8자 이상 (필수)"]').type('admin')
    cy.get('[type="text"]').type('admin')
    cy.get('[class="lk-button gradient"]').click()

    cy.contains('영문, 숫자, 특수문자 조합 8자 이상으로 사용해주세요. 사용가능한 특수문자는 ~ ! @ # $ % ^ & * 입니다.').should('exist')
    cy.contains('약관에 동의하셔야 합니다.').should('exist') 
  })

  it('2-3. createaccount failse(no email & password)', () => {
    // email text input false
    cy.contains('필수 정보입니다.').should('not.exist')
    cy.get('[class="lk-button gradient"]').click()
    cy.contains('필수 정보입니다.').should('exist') 
  })

  it('2-4. createaccount failse(no checkbox)', () => {
    // email text input false
    cy.contains('필수 정보입니다.').should('not.exist')
    cy.contains('약관에 동의하셔야 합니다.').should('not.exist')

    cy.get('[id="id"]').type('ruoghks@gmail.com')
    cy.get('[placeholder="영문, 숫자, 특수문자 조합 8자 이상 (필수)"]').type('@dl29240730')
    cy.get('[type="text"]').type('이경환')

    cy.get('[for="check_01"]').click()

    cy.get('[class="lk-button gradient"]').click()
    
    cy.contains('필수 정보입니다.').should('exist') 
    cy.contains('약관에 동의하셔야 합니다.').should('exist') 
  })

  it('2-5. createaccount failse(no checkbox)', () => {
    cy.get('[id="id"]').type('ruoghks@gmail.com')
    cy.get('[placeholder="영문, 숫자, 특수문자 조합 8자 이상 (필수)"]').type('@dl29240730')
    cy.get('[type="text"]').type('이경환')
    cy.get('[for="check_01"]').click()

    cy.get('[class="require"]').eq(0).click()

    cy.get('[class="lk-button gradient"]').click()
    
    cy.contains('사용중인 이메일입니다.').should('exist') 
  })

  it('2-6. createaccount ', () => {
    cy.get('[id="id"]').type('pogap61665@otodir.com')
    cy.get('[placeholder="영문, 숫자, 특수문자 조합 8자 이상 (필수)"]').type('@dl29240730')
    cy.get('[type="text"]').type('이경환')
    cy.get('[for="check_01"]').click()

    cy.get('[class="require"]').eq(0).click()

    cy.get('[class="lk-button gradient"]').click()
    
    // site page verification
    cy.url().should('include','/mypage')
    cy.wait(1000)
    cy.url().then((valse) => {
      cy.log('The current real URL id: ', valse)
    })
  })

})