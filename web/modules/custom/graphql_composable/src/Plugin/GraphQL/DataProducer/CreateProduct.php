<?php

namespace Drupal\graphql_composable\Plugin\GraphQL\DataProducer;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\graphql\Plugin\GraphQL\DataProducer\DataProducerPluginBase;
use Drupal\graphql_composable\GraphQL\Response\ProductResponse;
use Drupal\node\Entity\Node;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Creates a new product entity.
 *
 * @DataProducer(
 *   id = "create_product",
 *   name = @Translation("Create Product"),
 *   description = @Translation("Creates a new product."),
 *   produces = @ContextDefinition("any",
 *     label = @Translation("Product")
 *   ),
 *   consumes = {
 *     "data" = @ContextDefinition("any",
 *       label = @Translation("Product data")
 *     )
 *   }
 * )
 */
class CreateProduct extends DataProducerPluginBase implements ContainerFactoryPluginInterface {

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_user')
    );
  }

  /**
   * CreateProduct constructor.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param array $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Session\AccountInterface $current_user
   *   The current user.
   */
  public function __construct(array $configuration, string $plugin_id, array $plugin_definition, AccountInterface $current_user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->currentUser = $current_user;
  }

  /**
   * Creates a Product.
   *
   * @param array $data
   *   The submitted values for the product.
   *
   * @return \Drupal\graphql_composable\GraphQL\Response\ProductResponse
   *   The newly created product.
   *
   * @throws \Exception
   */
  public function resolve(array $data) {
    $response = new ProductResponse();
    if ($this->currentUser->hasPermission("create product content")) {
      $values = [
        'type' => 'product',
        'title' => $data['title'],
        'price' => $data['price'],
        'description' => $data['description'],
      ];
      $node = Node::create($values);
      $node->save();
      $response->setProduct($node);
    }
    else {
      $response->addViolation(
        $this->t('You do not have permissions to create products.')
      );
    }
    return $response;
  }

}
