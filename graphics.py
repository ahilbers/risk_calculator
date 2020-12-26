import matplotlib.pyplot as plt
import matplotlib.patches as patches


def create_dice_plots():
    for die_num in range(1, 7):        
        fig, ax = plt.subplots(figsize=(2, 2), frameon=False)
        ax.axis('off')
        ax.add_patch(patches.Rectangle(
            (0, 0), 1, 1, linewidth=0, facecolor='#ffffff'
        ))
        if die_num in [1, 3, 5]:
            ax.add_patch(patches.Circle(
                (0.5, 0.5), radius=0.1, edgecolor=None, facecolor='#000000'
            ))
        if die_num in [2, 3, 4, 5, 6]:
            ax.add_patch(patches.Circle(
                (0.2, 0.8), radius=0.1, edgecolor=None, facecolor='#000000'
            ))
        if die_num in [2, 3, 4, 5, 6]:
            ax.add_patch(patches.Circle(
                (0.8, 0.2), radius=0.1, edgecolor=None, facecolor='#000000'
            ))
        if die_num in [4, 5, 6]:
            ax.add_patch(patches.Circle(
                (0.2, 0.2), radius=0.1, edgecolor=None, facecolor='#000000'
            ))
        if die_num in [4, 5, 6]:
            ax.add_patch(patches.Circle(
                (0.8, 0.8), radius=0.1, edgecolor=None, facecolor='#000000'
            ))
        if die_num in [6]:
            ax.add_patch(patches.Circle(
                (0.2, 0.5), radius=0.1, edgecolor=None, facecolor='#000000'
            ))
            ax.add_patch(patches.Circle(
                (0.8, 0.5), radius=0.1, edgecolor=None, facecolor='#000000'
            ))
        ax.set_xlim([0, 1])
        ax.set_ylim([0, 1])
        plt.savefig('img/die_{}.png'.format(die_num), bbox_inches='tight',
                    pad_inches=0)


def main():
    create_dice_plots()


if __name__ == '__main__':
    main()
