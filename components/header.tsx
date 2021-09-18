import React, { useState } from 'react'
import styles from './header.module.scss'
import  Link  from 'next/link'
import Img from 'next/image'
import { FaBars, FaTimes } from 'react-icons/fa'
import useSWR from 'swr'
import { WP_REST_API_Post } from 'wp-types'
import { useRouter } from 'next/router'

export default function Header () {
  const router = useRouter()
  const isActiveLink = (route: string) => {
    if (route === 'home') return router.pathname === '/'
    return router.pathname === route
  }
  const getNavLinkClass = (route: string) => {
    if (isActiveLink(route)) {
      return `${styles.navLink} ${styles.activeNavLink}`
    } else if (route === 'rep-login') {
      return `${styles.navLink} ${styles.altNavLink}`
    } else {
      return `${styles.navLink}`
    }
  }
  
  const { data: logo } = useSWR('/api/media/purofluxlogo_white_2x')
  const logoSrc = logo?.media_details?.file && `${process.env.NEXT_PUBLIC_MEDIA_URL}/${logo.media_details.file}`
  
  const { data: menu } = useSWR('/api/menu/header-desktop')
  const [menuIsOpen, setMenu] = useState(false)
  
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="row">
          <div className="col col-xs-9 col-xl-3">
            <div className={styles.navBrand}>
              <Link href='/'>
                <a>
                  {logoSrc && (
                    <Img
                      src={logoSrc}
                      alt='Puroflux'
                      width={200}
                      height={42}
                    />
                  )}
                </a>
              </Link>
            </div>
          </div>
          <div className="col d-none d-xl-block col-xl-9">
            <nav className={styles.nav} aria-label={menu.name}>
              <ul className={styles.navMenu}>
                {menu?.items?.map((item: WP_REST_API_Post) => (
                  <li key={item.id} className={styles.navItem}>
                    <Link href={item.slug === 'home' ? '/' : item.slug}>
                      <a className={getNavLinkClass(item.slug)}>{item.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
    //               <NavMenu>
    //                 {menu.items.map(item => (

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
  )
}


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
