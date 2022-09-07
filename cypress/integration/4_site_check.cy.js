describe('empty spec', () => {

  beforeEach(function () {
    cy.viewport(1920,1080)
    cy.visit('https://sso.liveklass.com/login')

    // id & pw text input
    cy.get('[type="text"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('[type="text"]').type('kyeonghwan.lee@liveklass.com')
    cy.get('[type="password"]').type('@dl29240730')

    // login button click
    cy.get('[class="lk-button gradient"]').click()
    cy.wait(300)
    cy.visit('https://testlee001.liveklass.com/')
    cy.wait(300)
  })

  it('4-1. site check', () => {
    cy.contains('사이트 관리').should('exist')
    cy.contains('소개').should('exist') 
    cy.contains('프로그램').should('exist') 
    cy.contains('공지사항').should('exist') 
    cy.contains('나의 강의실').should('exist')
    
    cy.contains('소개').click()
    cy.wait(300)
    cy.contains('프로그램').click()
    cy.wait(300)
    cy.contains('전체').should('exist')
    cy.contains('비공개').should('exist')
    cy.contains('클래스 생성').should('exist')
    cy.contains('패키지 생성').should('exist')

    cy.contains('공지사항').click()
    cy.wait(300)
    cy.contains('글쓰기').should('exist')

    cy.contains('글쓰기').click()
    cy.wait(300)
    cy.contains('목록으로 돌아가기').should('exist')
    cy.contains('등록').should('exist')
    cy.contains('일반').should('exist')
    cy.contains('중요').should('exist')
    cy.contains('취소').should('exist')

    cy.get('[placeholder="공지사항으로 등록할 게시글의 제목을 입력합니다."]').type('제목')
    cy.get('[class="fr-element fr-view"]').type('TEST')

    cy.wait(300)
    cy.get('[type="submit"]').eq(0).click()

    cy.wait(300)
    cy.contains('나의 강의실').click()
  })
  it('4-2. site service (구독관리)', () => {
    cy.get('[class="lk-btn text icon header-menu-icon profile show"]').click()
    cy.contains('마이페이지로 이동').should('exist')
    cy.contains('내 정보 수정').should('exist') 
    cy.contains('서비스 구독').should('exist') 
    cy.contains('신청 내역').should('exist') 
    cy.contains('매출 관리').should('exist') 
    cy.contains('정산 관리').should('exist') 
    cy.contains('로그아웃').should('exist') 
    cy.wait(500)

    //서비스 구독 - 구독관리
    cy.contains('서비스 구독').click()
    cy.wait(500)
    
    cy.contains('내 정보 수정').should('exist') 
    cy.contains('서비스 구독').should('exist') 
    cy.contains('신청 내역').should('exist') 
    cy.contains('매출 관리').should('exist') 
    cy.contains('정산 관리').should('exist') 
    cy.contains('구독관리').should('exist') 
    cy.contains('구독내역').should('exist') 
    cy.contains('결제정보').should('exist') 
    cy.contains('할인 쿠폰').should('exist') 
    cy.contains('구독 변경').click()

    cy.contains('무료').should('exist') 
    cy.contains('마이크로').should('exist') 
    cy.contains('스몰').should('exist') 
    cy.contains('미디엄').should('exist') 
    cy.contains('라지').should('exist') 
    cy.contains('구독 플랜 변경하기').should('exist') 
    cy.contains('취소').should('exist') 
    cy.wait(300)
    cy.get('[class="el-switch__core"]').click()
    cy.get('[style="width: 40px; border-color: rgb(255, 96, 0); background-color: rgb(255, 96, 0);"]').should('exist')
    cy.get('[class="el-switch__core"]').click()
    cy.get('[style="width: 40px; border-color: rgb(255, 96, 0); background-color: rgb(255, 96, 0);"]').should('not.exist')
    
    cy.contains('마이크로').click()
    cy.wait(100)
    cy.contains('구독 취소(A)').should('exist') 
    cy.contains('환불').should('exist') 
    cy.contains('새로운 구독(B)').should('exist') 
    cy.contains('정상가').should('exist') 
    cy.contains('구독료').should('exist') 
    cy.contains('합계').should('exist') 
    cy.contains('19,900원').should('exist') 
    cy.contains('결제금액').should('exist') 
    cy.contains('현재 사용중인 플랜보다 더 많은 수강신청을 받을 수 있어요.').should('exist')
    cy.contains('구독 플랜 변경하기').click()
    cy.wait(100)
    
    cy.contains('새로운 카드 정보 등록').should('exist') 
    cy.contains('카드 번호').should('exist') 
    cy.contains('유효기간').should('exist') 
    cy.contains('비밀번호 앞 2자리').should('exist') 
    cy.contains('생년월일 6자리').should('exist') 
    cy.contains('결제용 이메일').should('exist') 
    cy.contains('취소').should('exist') 
    cy.contains('저장').should('exist') 

    cy.get('[name="cardNumber"]').type('111111111')
    cy.contains('올바른 카드번호를 입력해 주세요.').should('exist') 
    cy.wait(100)
    cy.get('[name="cardNumber"]').clear()
    cy.get('[name="cardNumber"]').type('1111111111111111')
    cy.contains('올바른 카드번호를 입력해 주세요.').should('not.exist') 
    cy.wait(100)

    cy.get('[name="expiry1"]').type('1')
    cy.contains('유효기간을 입력해 주세요').should('exist') 
    cy.wait(100)
    cy.get('[name="expiry1"]').type('1')
    cy.get('[name="expiry2"]').type('20')
    cy.wait(100)
    cy.contains('유효기간을 입력해 주세요').should('exist') 
    cy.get('[name="expiry2"]').type('26')
    cy.wait(100)

    cy.get('[name="pwd2Digit"]').type('1')
    cy.contains('올바른 비밀번호를 입력해 주세요.').should('exist') 
    cy.wait(100)
    cy.get('[name="pwd2Digit"]').type('1')
    cy.contains('올바른 비밀번호를 입력해 주세요.').should('not.exist') 

    cy.get('[name="birth"]').type('1')
    cy.get('[name="birth"]').clear()
    cy.wait(100)
    cy.contains('유효한 값을 입력해 주세요.').should('exist') 
    cy.get('[name="birth"]').type('19841228')
    cy.contains('유효한 값을 입력해 주세요.').should('not.exist') 
    cy.wait(100)

    cy.get('[name="email"]').type('1')
    cy.wait(100)
    cy.contains('올바른 이메일 주소를 입력해 주세요.').should('exist') 
    cy.get('[name="email"]').clear()
    cy.get('[name="email"]').type('ruoghks@gmail.com')
    cy.contains('올바른 이메일 주소를 입력해 주세요.').should('not.exist') 
    cy.wait(100)

    cy.get('[class="btn_common btn_point btn_medium"]').click()
    cy.wait(100)
    cy.contains('카드정보 인증 및 빌키 발급에 실패하였습니다. [F112]유효하지않은 카드번호를 입력하셨습니다. (card_bin 없음)').should('exist') 
    cy.get('[class="btn_common btn_point btn_popup_small focusable"]').click()
    //cy.get('[class="btn_common btn_gray btn_medium"]').click()
    
  })
  it('4-2. site service (구독 나머지)', () => {
    cy.get('[class="lk-btn text icon header-menu-icon profile show"]').click()
    cy.wait(500)

    //서비스 구독 - 구독관리
    cy.contains('서비스 구독').click()
    cy.wait(500)
    //서비스 구독 - 구독내역
    cy.contains('구독내역').click()

    //서비스 구독 - 결제정보
    cy.contains('결제정보').click()
    cy.contains('결제 카드 추가').should('exist') 
    cy.contains('수정').should('exist') 

    cy.contains('결제 카드 추가').click()
    cy.contains('취소').should('exist') 
    cy.contains('저장').should('exist') 
    cy.contains('취소').click()
    cy.wait(500)

    cy.get('[class="btn_common btn_dark btn_x_small"]').click()
    cy.contains('저장').should('exist')
    cy.wait(500)

    cy.contains('올바른 이메일 주소를 입력해 주세요.').should('not.exist') 
    cy.get('[type="email"]').clear()
    cy.get('[type="email"]').type('dsfasfs')
    cy.contains('저장').click()
    cy.contains('올바른 이메일 주소를 입력해 주세요.').should('exist') 
    cy.wait(500)

    cy.get('[type="email"]').clear()
    cy.contains('저장').click()
    cy.contains('올바른 이메일 주소를 입력해 주세요.').should('exist') 
    cy.wait(500)
    
    cy.get('[type="email"]').type('kyeonghwan.lee@liveklass.com')
    cy.contains('저장').click()
    cy.contains('이메일 정보가 수정되었습니다.').should('exist') 
    cy.get('[class="btn_common btn_point btn_popup_small focusable"]').click()
    cy.wait(500)

    //서비스 구독 - 할인쿠폰
    cy.contains('할인 쿠폰').click()
    cy.contains('쿠폰 추가').should('exist')
    cy.contains('쿠폰 추가').click()
    cy.wait(500)

    cy.contains('쿠폰 등록').should('exist')
    cy.contains('쿠폰 등록').click()
    cy.get('[class="btn_common btn_gray btn_small btn_point"]').click()
    cy.contains('쿠폰코드를 입력해 주세요').should('exist')
    cy.get('[class="btn_common txt_hide btn_popup_close focusable"]').click()
    cy.wait(500)

    //신청내역
    cy.contains('신청 내역').click()
    cy.wait(500)   

    //매출관리
    cy.contains('매출 관리').click()
    cy.wait(300)
    cy.contains('오늘').should('exist')
    cy.contains('1주일').should('exist')
    cy.contains('1개월').should('exist')
    cy.contains('3개월').should('exist')
    cy.contains('검색하기').should('exist')
    cy.contains('엑셀다운').should('exist')
    
    cy.get('[class="table_item_w"]').eq(1).click()
    cy.contains('확인').click()

    cy.contains('엑셀다운').click()
    cy.wait(300)

    //정산관리
    cy.contains('정산 관리').click()
    cy.wait(300)
    cy.contains('오늘').should('exist')
    cy.contains('1주일').should('exist')
    cy.contains('1개월').should('exist')
    cy.contains('3개월').should('exist')
    cy.contains('검색하기').should('exist')
    cy.contains('엑셀다운').should('exist')

    cy.get('[class="table_item_w"]').eq(1).click()
    cy.get('[class="btn_common btn_point btn_medium"]').click()

    cy.contains('엑셀다운').click()

  })

})