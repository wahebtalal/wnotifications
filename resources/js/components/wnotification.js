import { once } from 'alpinejs/src/utils/once'

export default (Alpine) => {
    Alpine.data('wnotificationComponent', ({ notification }) => ({
        isShown: false,
        progress: 0, // Added for progress bar
        progressInterval: null, // Timer for updating progress
        computedStyle: null,
        transitionDuration: null,
        transitionEasing: null,

        init: function () {

            this.computedStyle = window.getComputedStyle(this.$el)

            this.transitionDuration =
                parseFloat(this.computedStyle.transitionDuration) * 1000

            this.transitionEasing = this.computedStyle.transitionTimingFunction

            this.configureTransitions()
            this.configureAnimations()

            if (notification.duration && notification.duration !== 'persistent') {
                this.startProgressBar(notification.duration)
            }

            this.isShown = true

        },

        configureTransitions: function () {
            const display = this.computedStyle.display

            const show = () => {
                Alpine.mutateDom(() => {
                    this.$el.style.setProperty('display', display)
                    this.$el.style.setProperty('visibility', 'visible')
                })
                this.$el._x_isShown = true
            }

            const hide = () => {
                Alpine.mutateDom(() => {
                    this.$el._x_isShown
                        ? this.$el.style.setProperty('visibility', 'hidden')
                        : this.$el.style.setProperty('display', 'none')
                })
            }

            const toggle = once(
                (value) => (value ? show() : hide()),
                (value) => {
                    this.$el._x_toggleAndCascadeWithTransitions(
                        this.$el,
                        value,
                        show,
                        hide,
                    )
                },
            )

            Alpine.effect(() => toggle(this.isShown))
        },

        configureAnimations: function () {
            let animation

            Livewire.hook(
                'commit',
                ({ component, commit, succeed, fail, respond }) => {
                    if (
                        !component.snapshot.data
                            .isFilamentNotificationsComponent
                    ) {
                        return
                    }

                    const getTop = () => this.$el.getBoundingClientRect().top
                    const oldTop = getTop()

                    respond(() => {
                        animation = () => {
                            if (!this.isShown) {
                                return
                            }

                            this.$el.animate(
                                [
                                    {
                                        transform: `translateY(${
                                            oldTop - getTop()
                                        }px)`,
                                    },
                                    { transform: 'translateY(0px)' },
                                ],
                                {
                                    duration: this.transitionDuration,
                                    easing: this.transitionEasing,
                                },
                            )
                        }

                        this.$el
                            .getAnimations()
                            .forEach((animation) => animation.finish())
                    })

                    succeed(({ snapshot, effect }) => {
                        animation()
                    })
                },
            )
        },
        startProgressBar: function (duration) {
            this.progress = 0
            // let t
            var t=false;
            const interval =notification.intervalDelay; // 16ms is approximately 60fps
            const increment = (100 / duration) * interval;
            this.progressInterval = setInterval(() => {
                if (this.progress >= 100) {
                    this.prepareClose()
                    clearInterval(this.progressInterval)
                    return
                }
                // if (!this.$el.matches(':hover')) {
                    this.progress += increment;
                // }else {
                //
                //         this.progress += increment/4;
                //
                //
                // }

            }, interval)
        },

        prepareClose: function () {
                if (!this.$el.matches(':hover')) {
                    this.close()
                    return
                }
                this.$el.addEventListener('mouseleave', () => this.close())
        },

        close: function () {
            this.isShown = false

            setTimeout(
                () =>
                    window.dispatchEvent(
                        new CustomEvent('notificationClosed', {
                            detail: {
                                id: notification.id,
                            },
                        }),
                    ),
                this.transitionDuration,
            )
            setTimeout(() => clearInterval(this.progressInterval), this.transitionDuration)   // Stop progress bar timer

        },

        markAsRead: function () {
            window.dispatchEvent(
                new CustomEvent('markedNotificationAsRead', {
                    detail: {
                        id: notification.id,
                    },
                }),
            )
        },

        markAsUnread: function () {
            window.dispatchEvent(
                new CustomEvent('markedNotificationAsUnread', {
                    detail: {
                        id: notification.id,
                    },
                }),
            )
        },
    }))
}
