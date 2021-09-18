import React, { useState } from 'react'
import styles from './header.module.scss'
import  Link  from 'next/link'
import Img from 'next/image'
import { FaBars, FaTimes } from 'react-icons/fa'
import useSWR from 'swr'
import { WP_REST_API_Menu_Item } from '../lib/wordpress'
import { useRouter } from 'next/router'

export default function Header () {
  const router = useRouter()
  const isActiveLink = (route: string) => {
    if (route === 'home') return router.pathname === '/'
    return router.pathname === route
  }
  const getNavLinkClass = (route: string) => {
    if (isActiveLink(route)) {
      return styles.activeNavLink
    } else if (route === 'rep-login') {
      return styles.altNavLink
    } else {
      return styles.navLink
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
                {menu?.items?.map((item: WP_REST_API_Menu_Item) => (
                  <li key={item.id} className={styles.navItem}>
                    <Link href={item.slug === 'home' ? '/' : item.slug}>
                      <a className={getNavLinkClass(item.slug)}>{item.title}</a>
                    </Link>
                    {item?.child_items && (
                      <ul className={styles.childMenu}>
                        {item.child_items.map((childItem: WP_REST_API_Menu_Item) => (
                          <li key={childItem.id} className={styles.navItem}>
                            <Link href={childItem.slug}>
                              <a className={getNavLinkClass(childItem.slug)}>{childItem.title}</a>
                            </Link>
                            {childItem?.child_items && (
                              <ul className={styles.grandChildMenu}>
                                {childItem.child_items.map((grandChildItem: WP_REST_API_Menu_Item) => (
                                  <li key={grandChildItem.id} className={styles.navItem}>
                                    <Link href={grandChildItem.slug}>
                                      <a className={getNavLinkClass(grandChildItem.slug)}>{grandChildItem.title}</a>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>

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
