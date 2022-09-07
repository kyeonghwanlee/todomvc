describe('empty spec', () => {

  beforeEach(function () {
    cy.viewport(1920,1080)
    cy.visit('https://sso.liveklass.com/login')

     // id & pw text input
     cy.get('[type="text"]').type('pogap61665@otodir.com')
     cy.get('[type="password"]').type('@dl29240730')
 
     // login button click
     cy.get('[class="lk-button gradient"]').click()
     cy.wait(1000)
  })


  it('3. mypage page check', () => {
    //button check
    cy.contains('내 사이트').should('exist')
    cy.contains('운영 가이드').should('exist') 
    cy.contains('수강생 가이드').should('exist') 
    cy.contains('라클아카데미').should('exist') 
    cy.contains('내 사이트').should('exist')
    cy.contains('클래스').should('exist')
    
    // user stting button check
    cy.get('[class="ki-user"]').click()
    cy.wait(1000)

    cy.contains('마이페이지로 이동').should('exist')
    cy.contains('내 정보 수정').should('exist') 
    cy.contains('신청 내역').should('exist') 
    cy.contains('로그아웃').should('exist')  

    cy.contains('내 정보 수정').click()
    cy.wait(1000)
    cy.url().should('include','/editinformation')    
    cy.url().then((valse) => {
      cy.log('The current real URL id: ', valse)
    })

    //button check
    cy.contains('내 사이트').should('exist')  
    cy.contains('내 정보 저장하기').should('exist')
    cy.contains('메일 인증').should('exist')
    cy.contains('비밀번호를 재설정').should('exist') 
    cy.contains('내 정보 수정').should('exist') 
    cy.contains('신청 내역').should('exist')
    cy.contains('운영 가이드').should('exist') 
    cy.contains('수강생 가이드').should('exist') 
    cy.contains('라클아카데미').should('exist') 
  })

  it('3-1. editinformation page check', () => {
    cy.visit('https://sso.liveklass.com/editinformation')
    //phone chage
    cy.get('[name="phone"]').clear()
    cy.get('[name="phone"]').type('01012345678')
    cy.contains('정보가 수정되었습니다').should('not.exist')
    cy.get('[type="submit"]').click()
    cy.contains('정보가 수정되었습니다').should('exist')
    cy.get('[tabindex="1001"]').click() 

    //password chage
    cy.contains('새 비밀번호를 입력해 주세요.').should('not.exist')
    cy.get('[name="password"]').type('12')
    cy.get('[type="submit"]').click()
    cy.contains('새 비밀번호를 입력해 주세요.').should('exist')
    cy.wait(300)

    cy.get('[name="password"]').clear()
    cy.get('[name="password"]').type('@dl292407')

    cy.contains('비밀번호는 8자리 이상 입력해 주세요.').should('not.exist')
    cy.get('[name="newPassword"]').type('@dsfjl')
    cy.contains('비밀번호는 8자리 이상 입력해 주세요.').should('exist')
    cy.wait(300)

    cy.contains('비밀번호가 일치하지 않습니다.').should('not.exist')
    cy.get('[name="newPassword"]').clear()
    cy.get('[name="newPassword"]').type('@dl29240730') 
    cy.get('[name="passwordConfirm"]').type('@dsfjl')
    cy.contains('비밀번호가 일치하지 않습니다.').should('exist')
    cy.wait(300)

    cy.get('[name="passwordConfirm"]').clear()
    cy.get('[name="passwordConfirm"]').type('@dl29240730')

    cy.contains('비밀번호를 확인해 주세요.').should('not.exist')
    cy.get('[type="submit"]').click() 
    cy.contains('비밀번호를 확인해 주세요.').should('exist')
    cy.get('[tabindex="1001"]').click()
    cy.wait(300)

    cy.get('[name="password"]').clear()
    cy.get('[name="password"]').type('@dl29240730')
    cy.get('[name="newPassword"]').click()
    cy.wait(300)
    cy.contains('문자 1개 이상').should('exist')
    cy.contains('숫자 1개 이상').should('exist')
    cy.contains('특수문자 1개 이상').should('exist')
    cy.contains('최소 8자 이상').should('exist')
    cy.wait(300)

    cy.contains('정보가 수정되었습니다').should('not.exist')
    cy.get('[type="submit"]').click() 
    cy.contains('정보가 수정되었습니다').should('exist')
    cy.get('[tabindex="1001"]').click()

    //paymenthistory
    cy.contains('신청 내역').click()
    cy.wait(1000)
    cy.url().should('include','/paymenthistory')    
    cy.url().then((valse) => {
      cy.log('The current real URL id: ', valse)
    }) 

    cy.contains('내 사이트').should('exist')  
    cy.contains('내 정보 수정').should('exist') 
    cy.contains('신청 내역').should('exist')
    cy.contains('운영 가이드').should('exist') 
    cy.contains('수강생 가이드').should('exist') 
    cy.contains('라클아카데미').should('exist') 

    // user stting cilck
    cy.get('[class="ki-user"]').click()

    // logout
    cy.contains('로그아웃').click()    
  })

  it('3-1. editinformation email check', () => {
    cy.visit('https://sso.liveklass.com/editinformation')
    cy.wait(200)

    cy.contains('메일 인증 하기').click()

    cy.contains('인증하기').should('exist')  
    cy.contains('계정 인증 완료').should('exist')  

    cy.contains('인증하기').click()

    cy.get('[placeholder="인증번호 6자리 입력"]').type('324789')
    cy.contains('인증 코드가 잘못 되었습니다.').should('not.exist') 
    cy.contains('계정 인증 완료').click()
    cy.contains('인증 코드가 잘못 되었습니다.').should('exist') 
    cy.wait(200)

    cy.get('[class="btn_common btn_point btn_popup_small focusable"]').click()
    cy.wait(200)
    cy.get('[class="lk-mng-icon"]').click()

  })
})