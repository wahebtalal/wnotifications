<?php

namespace Wahebtalal\WNotifications;

use Filament\Notifications\Notification as BaseNotification;
use Filament\Support\Concerns\HasExtraAttributes;
use Wahebtalal\WNotifications\Concerns\HasExtraProgressAttributes;
use Wahebtalal\WNotifications\Concerns\HasIntervalDelay;
use Wahebtalal\WNotifications\Concerns\HasProgressColor;

class WNotification extends BaseNotification
{
    use HasExtraAttributes;
    use HasExtraProgressAttributes;
    use HasIntervalDelay;
    use HasProgressColor;

    protected string $view = 'wnotifications::notification';

    /**
     * @throws \Exception
     */
    public function toArray(): array
    {

        return array_merge(
            parent::toArray(),
            [
                'intervalDelay' => $this->getIntervalDelay(),
                'progressColor' => $this->getProgressColor(),
                'extraProgressAttributes' => $this->getExtraProgressAttributes(),
                'extraAttributes' => $this->getExtraAttributes(),

            ]
        );
    }

    public static function fromArray(array $data): static
    {

        $static = parent::fromArray($data);
        $static->intervalDelay($data['intervalDelay'] ?? config('wnotifications.intervalDelay'));
        $static->progressColor($data['progressColor'] ?? null);
        $static->ExtraProgressAttributes($data['extraProgressAttributes'] ?? []);
        $static->extraAttributes($data['extraAttributes'] ?? []);

        return parent::fromArray($data);
    }
}
