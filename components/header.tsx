import React, { useState } from 'react'
import styles from './header.module.scss'
import  Link  from 'next/link'
import Img from 'next/image'
import { FaBars, FaTimes } from 'react-icons/fa'
import useSWR from 'swr'

export default function Header () {
  const [menuIsOpen, setMenu] = useState(false)
  const { data: logo } = useSWR('/api/media/purofluxlogo_white_2x')
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="row">
          <div className="col col-xs-9 col-xl-3">
            <div className={styles.navBrand}>
              <Link href='/'>
                <a>
                  <Img
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${logo.media_details.file}`}
                    alt='Puroflux'
                    width={200}
                    height={42}
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
    //       {logo && (
    //         <Col xs={9} xl={3}>
    //           <NavBrand>
    //             <Link to='/' title={siteTitle}>
    //               <Img fixed={logo.localFile.childImageSharp.fixed} />
    //             </Link>
    //           </NavBrand>
    //         </Col>
    //       )}
    //       {menu && (
    //         <>
    //           <Col className='d-none d-xl-block' xl={9}>
    //             <Nav role={`navigation`} aria-label={menu.name}>
    //               <NavMenu>
    //                 {menu.items.map(item => (
    //                   <NavItem key={item.wordpress_id}>
    //                     <NavLink
    //                       activeClassName={`active`}
    //                       className={
    //                         item.object_slug === 'rep-login' ? `alt` : ``
    //                       }
    //                       to={
    //                         item.object_slug === 'home'
    //                           ? `/`
    //                           : `/${item.object_slug}/`
    //                       }
    //                     >
    //                       {item.title}
    //                     </NavLink>
    //                     {item.wordpress_children && (
    //                       <ChildMenu>
    //                         {item.wordpress_children.map(child => (
    //                           <NavItem key={child.wordpress_id}>
    //                             <NavLink
    //                               activeClassName={`active`}
    //                               to={`/${child.object_slug}/`}
    //                             >
    //                               {child.title}
    //                             </NavLink>
    //                             {child.wordpress_children && (
    //                               <GrandChildMenu>
    //                                 {child.wordpress_children.map(
    //                                   grandchild => (
    //                                     <NavItem
    //                                       key={grandchild.wordpress_id}
    //                                     >
    //                                       <NavLink
    //                                         activeClassName={`active`}
    //                                         to={`/${grandchild.object_slug}/`}
    //                                       >
    //                                         {grandchild.title}
    //                                       </NavLink>
    //                                     </NavItem>
    //                                   )
    //                                 )}
    //                               </GrandChildMenu>
    //                             )}
    //                           </NavItem>
    //                         ))}
    //                       </ChildMenu>
    //                     )}
    //                   </NavItem>
    //                 ))}
    //               </NavMenu>
    //             </Nav>
    //           </Col>
    //           <Overlay className='d-xl-none' menuIsOpen={menuIsOpen}>
    //             <MenuToggle
    //               menuIsOpen={menuIsOpen}
    //               onClick={() => setMenu(menuIsOpen => !menuIsOpen)}
    //             >
    //               {menuIsOpen ? <FaTimes /> : <FaBars />}
    //             </MenuToggle>
    //             <Nav role={`navigation`} aria-label={menu.name}>
    //               <NavMenu>
    //                 {menu.items.map(item => (
    //                   <NavItem key={item.wordpress_id}>
    //                     <NavLink
    //                       activeClassName={`active`}
    //                       className={
    //                         item.object_slug === 'rep-login' ? `alt` : ``
    //                       }
    //                       to={
    //                         item.object_slug === 'home'
    //                           ? `/`
    //                           : `/${item.object_slug}/`
    //                       }
    //                     >
    //                       {item.title}
    //                     </NavLink>
    //                   </NavItem>
    //                 ))}
    //               </NavMenu>
    //             </Nav>
    //           </Overlay>
    //         </>
    //       )}
    //     </Row>
  )
}


// const Nav = styled.nav`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   margin: 0 auto;
//   max-width: 960px;
// `


// const NavMenu = styled.ul`
//   padding: 0;
//   margin: 0;
//   list-style: none;
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: space-around;
//   align-items: center;
// `

// const SubMenu = styled(NavMenu)`
//   display: none;
//   flex-flow: column nowrap;
//   justify-content: flex-start;
//   align-items: flex-start;
//   position: absolute;
//   border-top: ${({ theme }) => `4px solid ${theme.primary}`};
//   width: max-content;
//   min-width: 120px;
//   z-index: 20;

//   li {
//     padding-right: 0.5rem;
//     width: 100%;

//     &:not(:last-child) {
//       margin-right: 0;
//     }
//   }

//   a {
//     padding: 0.45rem 0 0.45rem 0.45rem;
//   }
// `

// const ChildMenu = styled(SubMenu)`
//   background-color: white;
//   top: 100%;
//   left: 0;
//   padding-top: 1rem;

//   a {
//     color: ${({ theme }) => theme.primary};
//   }
// `

// const GrandChildMenu = styled(SubMenu)`
//   background-color: ${({ theme }) => theme.primary};
//   border-top: 0;
//   top: 0;
//   left: 100%;

//   li {
//     &:hover {
//       background-color: #ccc;
//     }
//   }

//   a {
//     color: white;

//     &:hover {
//       color: white;
//     }
//   }
// `

// const NavItem = styled.li`
//   flex: 0 0 auto;
//   position: relative;

//   &:not(:last-child) {
//     margin-right: 10px;
//   }

//   &:hover {
//     > ul {
//       display: flex;
//     }
//   }
// `

// const NavLink = styled(Link)`
//   color: white;
//   display: block;
//   font-family: 'Josefin Sans', sans-serif;
//   font-size: 0.8rem;
//   font-style: italic;
//   text-decoration: none;
//   text-transform: uppercase;
//   padding: 24.5px 0;

//   &.alt {
//     color: ${({ theme }) => theme.secondary};
//   }

//   &:hover,
//   &:focus,
//   &.active {
//     color: ${({ theme }) => theme.primary};
//   }
// `

// const MenuToggle = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   > svg {
//     color: ${({ menuIsOpen, theme }) =>
//     menuIsOpen ? theme.secondary : theme.primary};
//     font-size: 2rem;
//     cursor: pointer;
//     position: absolute;
//     top: 1rem;
//     right: 1rem;
//   }
// `

// const Overlay = styled.div`
//   position: ${({ menuIsOpen }) => (menuIsOpen ? `fixed` : `absolute`)};
//   top: 0;
//   right: 0;
//   width: ${({ menuIsOpen }) => (menuIsOpen ? `100vw` : `0px`)};
//   height: ${({ menuIsOpen }) => (menuIsOpen ? `100vh` : `0px`)};
//   background-color: rgba(0, 0, 0, 0.9);
//   z-index: 10;
//   transition: all 0.15s ease-in-out;

//   ${Nav} {
//     display: ${({ menuIsOpen }) => (menuIsOpen ? `flex` : `none`)};
//     justify-content: flex-start;
//     padding: 1rem 3rem;
//     height: 100%;

//     ul {
//       height: 100%;
//       flex-flow: column nowrap;
//       align-items: flex-start;

//       a {
//         font-size: 2rem;
//         font-style: normal;
//         padding: 0;
//       }
//     }
//   }
// `
