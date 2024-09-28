
import { trigger, transition, style, animate, state, keyframes, useAnimation, animation } from '@angular/animations';

export let bounceOutLeftAnimation = animation([
    animate('.5s ease-out', keyframes([
        style({
            offset: .1,
            opacity: 1,
            // transform: 'translate(20px)'
        }),
        style({
            offset: 1,
            opacity: 0,
            // transform: 'translateX(+50%)'
        })
    ]))
])

export let show = animation([
    style({ transform: 'translate(0, -20%)' })
])
export let hide = animation([
    style({ transform: 'translate(0, +50%)' })
])

export let fadeInAnimation = animation([
    style({opacity: 0}),
    animate(1000)
])

export let fade = trigger('fade', [
        transition(':enter', [
            useAnimation(fadeInAnimation, {
                params: {
                    duration: '5s',
                    easing: 'ease in'
                }
            })
        ]),
        transition(':leave', [
            animate(2000, style({ opacity: 0 }))
        ])
    ])

export let slide =
    trigger('slide', [
        transition(':enter', [
            useAnimation(show)
        ]),
        transition(':leave',
            //   animate('1s cubic-bezier(.41,.92,.82,.58)', style({transform: 'translateX(+30%'}))
            useAnimation(bounceOutLeftAnimation)
        )
    ]);