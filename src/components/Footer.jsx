import React from 'react'
import {LinkedinLogo, GithubLogo, EnvelopeSimple} from 'phosphor-react'
import './Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
        <span>©Gabriel Pimenta</span>
        <ul>
            <a href="https://www.linkedin.com/in/gabriel-alves-pimenta-a2a944163/" target="_blank">
                <li><LinkedinLogo size={40} weight="fill" /></li>
            </a>
            <a href="" target="_blank">
                <li><EnvelopeSimple size={40} weight="fill" /></li>
            </a>
            <a target="_blank" href="https://github.com/BielPimentaDev">
                <li><GithubLogo size={40} weight="fill" /></li>
            </a>
        </ul>
    </div>
  )
}
